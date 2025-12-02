import SearchInput from '../components/inputs/SearchInput'
import ReportCard from '../components/ReportCard'
import Footer from '../components/Footer'
import SqlPreview from '../components/modals/SqlPreview'
import AddTag from '../components/AddTag'
import TagsPreview from '../components/modals/TagsPreview'
import type React from 'react'
import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../contexts/SearchContext'
import FieldTag from '../components/Field'
import { ReportService } from '../services/ReportService'
import type { ReportModel } from '../models/ReportModel'
import DescriptionPreview from '../components/modals/DescriptionPreview'
import EditReport from '../components/modals/EditReport'

export const Home: React.FC = () => {
	const [reports, setReports] = useState<ReportModel[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const { tags } = useContext(SearchContext)!;

	useEffect(() => {
		const getReports = async () => {
			setLoading(true);

			const data: ReportModel[] = await ReportService.getReports();
			setReports(data);

			setLoading(false);
		}

		getReports();
	}, []);

	async function handleRefreshReports() {
		setLoading(true);

		const data: ReportModel[] = await ReportService.getReports();
		setReports(data);

		setLoading(false);
	}

	return (
		<>
			<div className='flex h-screen'>
				<aside className='flex flex-col p-4 border-rd ark:border-gray-700 w-72 h-full bg-aside-dark border border-border-dark'>
					<h1 className='text-lg font-bold text-white mb-2'>📂 Relatórios</h1>
					<p className='text-sm font-medium text-gray'>Nenhuma pasta selecionada.</p>

					<div className='flex flex-col text-white gap-2 my-8'>
						<button className='text-sm font-medium bg-blue hover:bg-blue-hover transition-colors rounded-md p-2 cursor-pointer'>
							Selecionar Pasta
						</button>
						<button
							className='text-sm font-medium border text-gray hover:text-white border-border-dark hover:border-border-hover transition-colors rounded-md p-2 cursor-pointer'
							onClick={() => {
								handleRefreshReports()
							}}
						>
							🔄 Atualizar
						</button>
					</div>

					<div className='flex flex-1 justify-center items-end'>
						<Footer />
					</div>
				</aside>

				<main className='flex flex-col flex-1 px-8 py-6 bg-body-dark gap-4'>
					<SearchInput />
					<div className='flex flex-row flex-wrap items-center w-fit gap-2'>
						{tags.length > 0 &&
							tags.map((tag) => (
								<FieldTag tag={tag} />
							))
						}
						<AddTag />
					</div>

					<div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 overflow-y-auto pr-2'>
						{loading ? (
							<p className='text-gray font-medium italic'>Carregando relatórios...</p>
						) : (
							reports.length > 0 &&
							reports.map((report: ReportModel, index) => (
								<ReportCard
									key={index}
									report={report}
								/>
							))
						)}
					</div>
				</main>
			</div>

			<SqlPreview />
			<DescriptionPreview />
			<TagsPreview />
			<EditReport />
		</>
	)
}