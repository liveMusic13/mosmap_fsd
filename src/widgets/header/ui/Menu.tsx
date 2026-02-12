'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { arrMenuHeader } from '../data/menu';

import { useCheckToken } from '@/app/providers/TokenProvider';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useDropdown } from '@/shared/hooks/useDropdown';
import { useMounted } from '@/shared/hooks/useMounted';
import Button from '@/shared/ui/Button';

interface IProps {
	position: 'horizontal' | 'vertical';
}

const Menu: FC<IProps> = ({ position }) => {
	const router = useRouter();

	const { token } = useCheckToken();

	const {
		handleMenuEnter,
		handleMenuLeave,
		handleMouseEnter,
		handleMouseLeave,
		isHovered,
	} = useDropdown();

	const isMounted = useMounted();

	const { mutate } = useLogout();

	const handleAuth = () => {
		if (!!token) {
			mutate();
		} else {
			router.push('/auth');
		}
	};

	return (
		<div
			className={`flex items-center justify-between gap-4.5 lg:gap-8.5 ${position === 'vertical' ? 'flex-col' : ''}`}
		>
			{arrMenuHeader.map(el => {
				if (el.type === 'button') {
					return (
						<Button key={el.id} variant='transparent' onClick={handleAuth}>
							{/*HELP: Если компонент ещё не смонтирован, рендерим одно и то же значение,
                    чтобы избежать рассогласования(ошибка гидратации). После монтирования покажется нужное */}
							{isMounted ? (!!token ? 'Выход' : el.title) : 'Загрузка...'}
						</Button>
					);
				} else if (el.type === 'link') {
					return (
						<Link
							key={el.id}
							href={el.link ? el.link : ''}
							target='_blank'
							className='font-semibold hover:text-primary transition-colors'
						>
							{el.title}
						</Link>
					);
				} else {
					return (
						<div
							key={el.id}
							className='flex items-center gap-1.5 relative font-semibold hover:text-primary transition-colors hover:cursor-pointer'
						>
							<p
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
							>
								{el.title}
							</p>
							<Image
								src={'/images/icons/arrow.svg'}
								alt='arrow'
								width={8}
								height={6}
							/>
							<div
								className='flex flex-col shadow-xl w-fit absolute left-0 top-6 bg-white rounded-xl z-9999'
								onMouseEnter={handleMenuEnter}
								onMouseLeave={handleMenuLeave}
							>
								{isHovered &&
									el.options?.map(opt => (
										<Link
											key={opt.id}
											href={opt.href}
											target='_blank'
											className='transition-colors text-xs text-text-black px-2.5 py-4 whitespace-nowrap border-b border-b-primary last:border-0 hover:cursor-pointer hover:text-primary'
										>
											{opt.title}
										</Link>
									))}
							</div>
						</div>
					);
				}
			})}
		</div>
	);
};

export default Menu;
