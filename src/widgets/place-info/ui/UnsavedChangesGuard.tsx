'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { savePlaceInfo } from '@/entities/place';
import { useTargetPlaceIdStore } from '@/entities/place/store/targetPlace.store';
import { IDetailsPlaceInfo } from '@/entities/place/types';
import { useGetMapPageData } from '@/shared/hooks/api-hooks/useGetMapPageData';
import { useGetSeoOrQueryParam } from '@/shared/hooks/useGetSeoOrQueryParam';
import { buildQueryParams } from '@/shared/lib/url';
import { TViewBlocks } from '@/shared/types/store.types';
import Button from '@/shared/ui/Button';
import Popup from '@/shared/ui/Popup';

interface IProps {
	view: TViewBlocks;
	token: string | null | undefined;
}

interface IPendingSwitch {
	oldId: number;
	newId: number;
	savedValues: Record<string, string>;
	oldData: IDetailsPlaceInfo | undefined;
}

export const UnsavedChangesGuard: FC<IProps> = ({ view, token }) => {
	const {
		formState: { isDirty },
		getValues,
	} = useFormContext();

	const targetPlaceId = useTargetPlaceIdStore(store => store.id);
	const setTargetId = useTargetPlaceIdStore(store => store.setTargetId);
	const mapOrSeoUrl = useGetSeoOrQueryParam();
	const searchParams = useSearchParams();
	const queryClient = useQueryClient();

	const [pendingSwitch, setPendingSwitch] = useState<IPendingSwitch | null>(
		null,
	);
	const prevIdRef = useRef<number | null>(null);

	const queryString = buildQueryParams(
		mapOrSeoUrl.type,
		searchParams,
		mapOrSeoUrl.result,
	);
	const { refetch } = useGetMapPageData(queryString);

	const { mutate: saveOldPlace, isSuccess: isSaveSuccess } = useMutation({
		mutationFn: (data: { queryParams: string; place: IDetailsPlaceInfo }) =>
			savePlaceInfo(data),
		onSuccess: savedData => {
			queryClient.invalidateQueries({
				queryKey: ['details-place', savedData.id],
			});
		},
	});

	useEffect(() => {
		if (isSaveSuccess) {
			refetch();
		}
	}, [isSaveSuccess]);

	useEffect(() => {
		const prevId = prevIdRef.current;

		if (
			prevId !== null &&
			targetPlaceId !== null &&
			targetPlaceId !== prevId &&
			isDirty &&
			token &&
			view === 'place-info'
		) {
			const savedValues = getValues() as Record<string, string>;
			const oldData = queryClient.getQueryData<IDetailsPlaceInfo>([
				'details-place',
				prevId,
			]);

			setPendingSwitch({
				oldId: prevId,
				newId: targetPlaceId,
				savedValues,
				oldData,
			});
		}

		prevIdRef.current = targetPlaceId;
	}, [targetPlaceId]);

	const handleSave = () => {
		if (!pendingSwitch?.oldData) {
			setPendingSwitch(null);
			return;
		}

		const queryParams =
			mapOrSeoUrl.type === 'query'
				? `?map=${mapOrSeoUrl.result}`
				: `?url=${mapOrSeoUrl.result}`;

		const editPlace: IDetailsPlaceInfo = {
			...pendingSwitch.oldData,
			values: pendingSwitch.oldData.values.map(info => ({
				...info,
				value: pendingSwitch.savedValues[info.label] ?? info.value,
			})),
		};

		saveOldPlace({ place: editPlace, queryParams });
		setPendingSwitch(null);
	};

	const handleDiscard = () => {
		setPendingSwitch(null);
	};

	const handleCancel = () => {
		if (!pendingSwitch) return;
		setTargetId(pendingSwitch.oldId);
		setPendingSwitch(null);
	};

	return (
		<Popup open={pendingSwitch !== null} onClose={handleDiscard}>
			<div>
				<p className='font-bold mb-2'>
					У вас есть несохраненные изменения. Сохранить их?
				</p>
				<div className='flex items-center justify-center gap-2'>
					<Button
						variant='green'
						className='w-fit! h-7!'
						onClick={handleSave}
					>
						Сохранить
					</Button>
					<Button
						variant='transparent-gray'
						className='w-fit! h-7!'
						onClick={handleDiscard}
					>
						Не сохранять
					</Button>
					<Button
						variant='transparent'
						className='w-fit! h-7!'
						onClick={handleCancel}
					>
						Отмена
					</Button>
				</div>
			</div>
		</Popup>
	);
};
