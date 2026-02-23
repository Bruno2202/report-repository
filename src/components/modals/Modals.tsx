import type React from "react";
import SqlPreview from "./SqlPreview";
import DescriptionPreview from "./DescriptionPreview";
import EditReport from "./EditReport/EditReport";
import type { TagModel } from "../../models/TagModel";
import SearchTagsPreview from "./SearchTagsPreview";
import AddReport from "./AddReport";
import HowToUse from "./HowToUse";

interface ModalsProps {
    searchTagsData: {
        selectedTags: TagModel[];
        setSelectedTags: React.Dispatch<React.SetStateAction<TagModel[]>>
    }
    refreshReports: () => void;
}

const Modals: React.FC<ModalsProps> = ({ searchTagsData, refreshReports }) => {
    return (
        <>
            <SqlPreview />
            <DescriptionPreview />
            <SearchTagsPreview
                selectedTags={searchTagsData.selectedTags}
                setSelectedTags={searchTagsData.setSelectedTags}
            />
            <EditReport />
            <AddReport
                refreshReports={refreshReports}
            />
            <HowToUse />
        </>
    )
}

export default Modals;