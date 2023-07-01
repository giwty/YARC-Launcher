import { useQuery } from "@tanstack/react-query";

export interface SetlistSong {
    title: string,
    artist: string,
    length: number
}

export interface SetlistData {
    id: string,
    version: string,
    downloads: string[],
    locales: {
        [language: string]: {
            title: string,
            description: string,
        }
    },
    songs: SetlistSong[],
    organizer: string[],
    credits: string[]
}

export type SetlistID = "official";

export const useSetlistRelease = (id: SetlistID) => {
    return useQuery({
        queryKey: ["Setlist", id],
        queryFn: async (): Promise<SetlistData> => await fetch(
            `https://raw.githubusercontent.com/YARC-Official/Official-Setlist-Public/master/setlists/${id}.json`)
            .then(res => res.json())
    }).data as SetlistData;
};