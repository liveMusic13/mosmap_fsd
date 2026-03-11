import MapSettings from '@/features/map-settings/ui/MapSettings';
import WrapperSettings from '@/widgets/settings/ui/WrapperSettings';

export default function SettingsMapPage() {
	return (
		<div className='flex items-center justify-center w-full p-2 flex-1 min-h-0 overflow-hidden'>
			<WrapperSettings title='Настройка карты'>
				<MapSettings />
			</WrapperSettings>
		</div>
	);
}
