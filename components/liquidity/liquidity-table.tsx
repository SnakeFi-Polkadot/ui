import { liquidityPools } from '@/utils/data.util';
import { columns as liquidityPoolColumns } from './table/columns';
import { DataTable as LiquidityPoolDataTable } from './table/data-table';
import { LiquidityPool } from '@/utils/types.util';


async function getData(): Promise<LiquidityPool[]> {
  // Fetch data from your API here.
  return liquidityPools;
}

export default async function LiquidityPoolTable() {
  const data = await getData()

  return (
    <div className="container mx-auto rounded-xl bg-white text-black">
      <LiquidityPoolDataTable columns={liquidityPoolColumns} data={data} />
    </div>
  )
}
