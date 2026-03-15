

export async function getCompanyNews(companyId: string) {
    try {
        const response = await fetch(`https://news-api.jona-581.workers.dev/?id=${companyId}`);
         if (!response.ok) return null;
         
         const data = await response.json();
         return data;


    } catch (error) {
        console.error('Error fetching company news:', error);
        return null;
    }


}