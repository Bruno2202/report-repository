import React from 'react';
import { Settings, AlertTriangle } from 'lucide-react';

const Maintenance: React.FC = () => {
	return (
		<div className="min-h-screen bg-body-dark flex items-center justify-center p-6 text-white font-sans">
			<div className="max-w-md w-full text-center space-y-8">

				<div className="flex justify-center">
					<div className="relative">
						<Settings className="w-24 h-24 text-blue opacity-10 animate-[spin_8s_linear_infinite]" />
						<Settings className="w-12 h-12 text-blue absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite_reverse]" />
					</div>
				</div>

				<div className="space-y-4">
					<h1 className="text-4xl font-bold tracking-tight text-white">
						Estamos em <span className="text-blue">Manutenção</span>
					</h1>
					<p className="text-gray text-lg">
						Estamos atualizando nossos sistemas para oferecer uma experiência ainda melhor. Voltaremos em breve!
					</p>
				</div>

				<div className="bg-aside-dark border border-border-dark rounded-2xl p-6 shadow-2xl">
					<div className="flex items-center justify-center gap-3 text-sm text-gray leading-tight">
						<AlertTriangle className="w-5 h-5 text-blue flex-shrink-0" />
						<span className="text-left">
							Isso não afetará seus dados salvos nos relatórios personalizados.
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Maintenance;