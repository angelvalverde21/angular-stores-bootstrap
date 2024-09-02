export function formatOptionData(data: any[]): any {
    // Transforma el array de objetos en un objeto de clave-valor para usar con patchValue
    const result: any = {};
    data.forEach(item => {
      result[item.name] = item.value || '';
    });
    return result;
}

export function formatData(data: any[]): any {
    // Transforma el array de objetos en un objeto de clave-valor para usar con patchValue
    const result: any = {};
    data.forEach(item => {
      result[item.name] = item.name || '';
    });
    return result;
}