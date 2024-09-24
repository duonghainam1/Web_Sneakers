export function Convert_Color(colorItem: string) {
    const item = colorItem.trim().toLowerCase();
    let color: string;

    switch (item) {
        case 'red':
        case 'đỏ':
            color = 'bg-red-500 border-none';
            break;
        case 'black':
        case 'đen':
            color = 'bg-black border-none';
            break;
        case 'yellow':
        case 'vàng':
            color = 'bg-yellow-500 border-none';
            break;
        case 'pink':
        case 'hồng':
            color = 'bg-pink-500 border-none';
            break;
        case 'green':
        case 'xanh lá':
            color = 'bg-green-500 border-none';
            break;
        case 'violet':
        case 'tím':
            color = 'bg-violet-500 border-none';
            break;
        case 'blue':
        case 'xanh dương':
            color = 'bg-blue-500 border-none';
            break;
        case 'brown':
        case 'nâu':
            color = 'bg-amber-950 border-none';
            break;
        case 'orange':
        case 'cam':
            color = 'bg-orange-500 border-none';
            break;
        case 'gray':
        case 'xám':
            color = 'bg-gray-500 border-none';
            break;
        case 'white':
        case 'trắng':
            color = 'bg-white border border-black';
            break;
        case 'purple':
        case 'tím than':
            color = 'bg-purple-500 border-none';
            break;
        case 'cyan':
        case 'xanh lam nhạt':
            color = 'bg-cyan-500 border-none';
            break;
        case 'magenta':
        case 'hồng đậm':
            color = 'bg-magenta-500 border-none';
            break;
        default:
            color = 'bg-white border border-black';
            break;
    }

    return color;
}
