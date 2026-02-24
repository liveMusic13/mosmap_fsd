import { ImportDoneForm } from '@/features/import';
import WrapperImportExport from '@/widgets/import-export/ui/WrapperImportExport';

export default function ImportDonePage() {
	return (
		<div className='flex items-center justify-center max-h-full w-full flex-1 min-h-0 overflow-hidden'>
			<WrapperImportExport title='Настройка данных для загрузки на сервер'>
				<ImportDoneForm />
			</WrapperImportExport>
		</div>
	);
}
