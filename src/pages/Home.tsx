import SearchInput from '../components/inputs/SearchInput'
import ReportCard from '../components/ReportCard'
import AddTag from '../components/AddTag'
import type React from 'react'
import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../contexts/SearchContext'
import FieldTag from '../components/Field'
import { ReportService } from '../services/ReportService'
import type { ReportModel } from '../models/ReportModel'
import type { TagModel } from '../models/TagModel'
import Sidebar from '../components/Sidebar'
import Modals from '../components/modals/Modals'
import { ReportContext } from '../contexts/ReportContext'

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
						(report.description && report.description.toLowerCase().includes(search)) ||
						(report.title && report.title.toLowerCase().includes(search));

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
				<Sidebar
					refreshReports={handleRefreshReports}
				/>
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
						<AddTag modal="SearchTagsPreview" />
					</div>
					{loading ? (
						<div className='flex w-full h-full items-center justify-center'>
							<img
								src="/assets/img/loading.gif"
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

			<Modals
				searchTagsData={{
					selectedTags: selectedTags,
					setSelectedTags: setSelectedTags
				}}
				refreshReports={handleRefreshReports}
			/>
		</>
	)
}