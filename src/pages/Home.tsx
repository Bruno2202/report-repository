import SearchInput from '../components/inputs/SearchInput'
import ReportCard from '../components/ReportCard'
import Footer from '../components/Footer'
import SqlPreview from '../components/modals/SqlPreview'
import AddTag from '../components/AddTag'
import type React from 'react'
import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../contexts/SearchContext'
import FieldTag from '../components/Field'
import { ReportService } from '../services/ReportService'
import type { ReportModel } from '../models/ReportModel'
import DescriptionPreview from '../components/modals/DescriptionPreview'
import EditReport from '../components/modals/EditReport'
import { ReportContext } from '../contexts/ReportContext'
import SearchTagsPreview from '../components/modals/SearchTagsPreview'
import type { TagModel } from '../models/TagModel'
import toast from 'react-hot-toast'

export const Home: React.FC = () => {
	const [filteredReports, setFilteredReports] = useState<ReportModel[]>([])
	const [loading, setLoading] = useState<boolean>(false);
	const [selectedTags, setSelectedTags] = useState<TagModel[]>([]);

	const { searchParam, setSearchParam } = useContext(SearchContext)!;
	const { reports, setReports } = useContext(ReportContext)!;

	useEffect(() => {
		const getReports = async () => {
			setLoading(true);

			const data: ReportModel[] = await ReportService.getReports();
			setReports(data);
			setFilteredReports(data);

			setLoading(false);
		}

		getReports();
	}, []);

	useEffect(() => {
		setFilteredReports(reports);
	}, [reports]);


	useEffect(() => {
		const searchReports = () => {
			if (reports.length > 0) {
				const reportsData = reports.filter(report => {
					const search = searchParam.toLowerCase();
					const matchesText =
						report.folder.toLowerCase().includes(search) ||
						(report.xml && report.xml.toLowerCase().includes(search)) ||
						(report.description && report.description.toLowerCase().includes(search));

					const matchesTags = selectedTags.length === 0 ||
						selectedTags.every(sTag =>
							report.tags?.some(rTag => {
								const tagName = typeof rTag === 'object' ? rTag.name : rTag;

								return tagName?.toLowerCase() === sTag.name?.toLowerCase();
							})
						);

					return matchesText && matchesTags;
				});

				setFilteredReports(reportsData);
			}
		};

		searchReports();
	}, [searchParam, selectedTags, reports]);

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
						<button 
							className='text-sm font-medium bg-blue hover:bg-blue-hover transition-colors rounded-xl p-2 cursor-pointer
								opacity-50
							'
							onClick={() => {
								toast("Funcionalidade indisponível")
							}}	
						>
							Selecionar Pasta
						</button>
						<button
							className='text-sm font-medium border text-gray hover:text-white border-border-dark hover:border-border-hover transition-colors rounded-xl p-2 cursor-pointer'
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
					<SearchInput onChange={(e) => setSearchParam(e.target.value)} />
					<div className='flex flex-row flex-wrap items-center w-fit gap-2'>
						{selectedTags.length > 0 &&
							selectedTags.map((tag) => (
								<FieldTag
									key={tag.id}
									tag={tag}
									selectedTags={selectedTags}
									setSelectedTags={setSelectedTags}
								/>
							))
						}
						<AddTag modal="SearchTagsPreview"/>
					</div>
					{loading ? (
						<div className='flex w-full h-full items-center justify-center'>
							<img
								src="/assets/img/loading.gif"
								alt="Carregando..."
								className="w-12 h-12 object-contain opacity-85"
							/>
						</div>
					) : (
						<div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 overflow-y-auto pr-2 pt-2'>
							{
								filteredReports && filteredReports.length > 0 && (
									filteredReports.map((report: ReportModel, index) => (
										<ReportCard
											key={index}
											report={report}
										/>
									))
								)
							}
						</div>
					)}
				</main>
			</div>

			<SqlPreview />
			<DescriptionPreview />
			<SearchTagsPreview selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
			<EditReport />
		</>
	)
}