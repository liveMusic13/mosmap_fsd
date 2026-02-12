'use client';

export default function GlobalError({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<html>
			<body className='flex min-h-screen items-center justify-center'>
				<div className='text-center'>
					<h2 className='text-2xl font-bold'>Критическая ошибка</h2>
					<p className='mt-2 text-muted-foreground'>
						Что-то пошло не так. Текст ошибки {error.message}
					</p>
					<button
						onClick={() => {
							window.location.href = '/auth';
						}}
						className='mt-4 rounded bg-black px-4 py-2 text-white'
					>
						Попробовать снова
					</button>
				</div>
			</body>
		</html>
	);
}
