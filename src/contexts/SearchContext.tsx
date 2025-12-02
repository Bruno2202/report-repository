import React, { createContext, useState } from "react";
import type { Tag } from "../data/tags";

interface Props {
    children: React.ReactNode;
}

interface SearchContextType {
    tags: Tag[];
    setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
    searchParam: string;
    setSearchParam: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = createContext<SearchContextType | null>(null);

export default function SearchProvider({ children }: Props) {
    const [tags, setTags] = useState<Tag[]>([]);
    const [searchParam, setSearchParam] = useState<string>("");

    return (
        <SearchContext.Provider
            value={{
                tags,
                setTags,
                searchParam,
                setSearchParam
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}