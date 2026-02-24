import { ImportForm } from '@/features/import';
import WrapperImportExport from '@/widgets/import-export/ui/WrapperImportExport';

export default function ImportPage() {
	return (
		<div className='flex items-center justify-center w-full flex-1 min-h-0 overflow-hidden'>
			<WrapperImportExport title='Отправка данных на сервер'>
				<ImportForm />
			</WrapperImportExport>
		</div>
	);
}
