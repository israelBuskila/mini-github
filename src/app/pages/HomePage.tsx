import React, { useCallback, useEffect, useState } from 'react';
import RepoApi from '../services/repo.api';
import { Repository } from '../types/repository';
import ReposList from '../components/ReposList';
import { useAtom } from 'jotai';
import  repositoriesAtom  from '../services/repo.data';
import { useSearchParams } from 'react-router-dom';


export default function HomePage() {
    const [repos, setRepos] = useAtom(repositoriesAtom);
    const [sortByStars, setSortByStars] = useState(false);
    const [params, setParams] = useSearchParams()
    

    const updateData = useCallback(async (search: string) => {
        try {
            const result = await RepoApi.getRepos(search)
            setRepos(result)
        } catch (error) {
            setRepos([])
            
        }
    }, [])

    useEffect(() => {
       const search = params.get('search')
       if(!search) {
        setRepos([])
        return
       }
       updateData(search)
    }, [params.get('search'),updateData])


    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const username = e.target.value;
        setParams({search: username})
    };

    const handleSort = () => {
        setSortByStars(!sortByStars);
        const sortedRepos = [...repos].sort((a, b) => 
                b.stargazers_count - a.stargazers_count
        );
        setRepos(sortedRepos);
    };

    return (
        <div>
            <div className="header-container">
                <h1 className="main-title">GitHub Repo Explorer</h1>
                <h3 className="subtitle">Enter a GitHub username to explore repositories</h3>
                <div className="search-container">
                    <input 
                        className="search-input"
                        placeholder="Search Github user..."
                        onChange={handleSearch}
                    />
                    <button 
                        className="sort-button"
                        onClick={handleSort}
                    >
                        <i className="star-icon">⭐</i>
                        Sort by Stars
                    </button>
                </div>
            </div>
            <ReposList repositories={repos} />
        </div>
    );
}