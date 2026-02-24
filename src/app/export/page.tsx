import { ExportForm } from '@/features/export';
import WrapperImportExport from '@/widgets/import-export/ui/WrapperImportExport';

export default function ExportPage() {
	return (
		<div className='flex items-center justify-center w-full flex-1 min-h-0 overflow-hidden'>
			<WrapperImportExport title='Выгрузка данных'>
				<ExportForm />
			</WrapperImportExport>
		</div>
	);
}
