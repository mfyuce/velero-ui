import { useApiGet } from '@/hooks/utils/useApiGet';

type TargetType = 'core' | 'agent' | 'static';

// Hook to handle category task fetching logic
export const useGithubRepoVersion = () => {
    const { data, getData, fetching, error } = useApiGet();

    const getRepoVersion = async (target: TargetType, force: boolean=false) => {
        try {
            // Execute the API call with the generic method
            await getData({
                url: '/info/get-repo-tags',
                params: `force_scrapy=${force}`,
                target: target,
            });

            // This code will be executed only in case of success
            // console.log('Request successful, execute final action...');
        } catch (error) {
            // Error handling
            // console.error('Error during call:', error);
        } finally {
            // This code will always be executed
            // console.log('Final action after request')
        }
    };

    // Return the function for the call and the necessary data
    return { getRepoVersion, data, fetching, error };
};
