import axios from "axios";
import { Contributor, Repository } from "../types/repository";
import {axiosInstance} from "./api"


const RepoApi = {   
    getRepos: async (username: string): Promise<Repository[]> => {
        const response = await axiosInstance.get(`/users/${username}/repos`);
        console.log(response.data.data);
        return response.data;
    },
    getRepo: async (username: string, repoName: string): Promise<Repository> => {
        const response = await axiosInstance.get(`/repos/${username}/${repoName}`);
        return response.data;
    },
    getContributors: async (username: string, repoName: string): Promise<Contributor[]> => {
        const response = await axiosInstance.get(`/repos/${username}/${repoName}/contributors`)
        return response.data
    }

};

export default RepoApi;