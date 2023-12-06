// import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import styles from './style.module.css'

export default function Table({ columns, rows, onRowClick}) {
    return (
        <div className={styles.container}>
            <DataGrid
                rows={rows}
                columns={columns}
                onRowClick={onRowClick}
                isRowSelectable={() => false}
                className={styles.table}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 10},
                    },
                }}
                pageSizeOptions={[10]}
            />
        </div>
    );
}