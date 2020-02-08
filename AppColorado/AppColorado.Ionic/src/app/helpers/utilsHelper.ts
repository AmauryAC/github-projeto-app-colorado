export class UtilsHelper {
    public static data = {
        sorting: (array: any, field: string): any => {
            return array.sort((a, b) => {
                var x = a[field];
                var y = b[field];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        },

        filter: (array: Array<any>, key: string, keyValue: string): any => {
            if(key && keyValue) {
                if(key == 'Categoria') {
                    return array.filter(item => item.categoria.nome == keyValue);
                }
                else if(key == 'Nome') {
                    return array.filter(item => item.nome.toLowerCase().indexOf(keyValue.toLowerCase()) != -1);
                }
                else if(key == 'Bairro') {
                    array = array.filter(item => item.estabFixo == true);

                    return array.filter(item => item.endereco.bairro.toLowerCase().indexOf(keyValue.toLowerCase()) != -1);
                }
                else if(key == 'Cidade') {
                    array = array.filter(item => item.estabFixo == true);

                    return array.filter(item => item.endereco.cidade.toLowerCase().indexOf(keyValue.toLowerCase()) != -1);
                }
                else if(key == 'Área de Atuação') {
                    array = array.filter(item => item.estabFixo == false);

                    return array.filter(item => item.areaAtuacao.toLowerCase().indexOf(keyValue.toLowerCase()) != -1);
                }     
            }
        }
    }

    public static number = {
        formatCurrency: (valor: number): string => {
            return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
        }
    }
}