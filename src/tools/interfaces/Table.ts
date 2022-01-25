export enum Table {
    TODO= 'TODO',
    DOING = 'DOING',
    DONE = 'DONE'
}

export const TableIterator = () => ['TODO', 'DOING', 'DONE'];

export const getTable = (str: string): Table => {
    switch (str.toUpperCase()) {
        case 'TODO': return Table.TODO;
        case 'DOING': return Table.DOING;
        case 'DONE': return Table.DONE;
        default: return Table.TODO
    }
}
