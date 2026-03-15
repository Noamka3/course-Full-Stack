import {SalesforceData} from '../models/SalesforceData';

export async function getCompanyFinancials(company_id:string){

const rows = await SalesforceData.findAll({ where: { companyId: company_id } });
if(rows.length === 0){
    return null;
}
const lastYear = Math.max(...rows.map(r => r.year));
const lastYearRow = rows.find(r => r.year === lastYear)!;

return {
    year: lastYearRow.year,
    sales: Number(lastYearRow.sales),
    profit: Number(lastYearRow.profit),
};
}