import DatabaseSettings from '@/features/database-settings/ui/DatabaseSettings';
import WrapperSettings from '@/widgets/settings/ui/WrapperSettings';

export default function SettingsDatabase() {
	return (
		<div className='flex items-center justify-center w-full p-2 flex-1 min-h-0 overflow-hidden'>
			<WrapperSettings title='Настройка базы данных'>
				<DatabaseSettings />
			</WrapperSettings>
		</div>
	);
}
