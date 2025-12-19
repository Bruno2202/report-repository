import React, { createContext, useState } from "react";
import type { TagModel } from "../models/TagModel";

interface Props {
    children: React.ReactNode;
}

interface SearchContextType {
    tags: TagModel[];
    setTags: React.Dispatch<React.SetStateAction<TagModel[]>>;
    searchParam: string;
    setSearchParam: React.Dispatch<React.SetStateAction<string>>;
    searchTagsParam: string;
    setSearchTagsParam: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType | null>(null);

export default function SearchProvider({ children }: Props) {
    const [tags, setTags] = useState<TagModel[]>([]);
    const [searchParam, setSearchParam] = useState<string>("");
    const [searchTagsParam, setSearchTagsParam] = useState<string>("");

    return (
        <SearchContext.Provider
            value={{
                tags,
                setTags,
                searchParam,
                setSearchParam,
                searchTagsParam,
                setSearchTagsParam
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}