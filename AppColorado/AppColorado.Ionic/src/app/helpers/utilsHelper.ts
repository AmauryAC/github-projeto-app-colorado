export class UtilsHelper {
    public static data = {
        sorting: (array: any, field: string): any => {
            return array.sort((a, b) => {
                var x = a[field];
                var y = b[field];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        },

        filter: (array: Array<any>, filter: string): any => {
            return array.filter(item => item.categoria.nome == filter);
        }
    }

    public static number = {
        formatCurrency: (valor: number): string => {
            return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
        }
    }
}