const products = [
    {
        id: '1',
        title: 'Camiseta Dinossauro',
        price: 119.90,
        images: [
            { id: 'img1', url: '/dinoshirt/azul-escura/1.png' },
            { id: 'img2', url: '/dinoshirt/azul-escura/2.png' },
            { id: 'img3', url: '/dinoshirt/azul-escura/3.png' },
            { id: 'img4', url: '/dinoshirt/azul-escura/4.png' },
            { id: 'img5', url: '/dinoshirt/branca/1.png' },
            { id: 'img6', url: '/dinoshirt/branca/2.png' },
            { id: 'img7', url: '/dinoshirt/branca/3.png' },
            { id: 'img8', url: '/dinoshirt/branca/4.png' },
            { id: 'img9', url: '/dinoshirt/preta/1.png' },
            { id: 'img10', url: '/dinoshirt/preta/2.png' },
            { id: 'img11', url: '/dinoshirt/preta/3.png' },
            { id: 'img12', url: '/dinoshirt/preta/4.png' },
            { id: 'img13', url: '/dinoshirt/verde/1.png' },
            { id: 'img14', url: '/dinoshirt/verde/2.png' },
            { id: 'img15', url: '/dinoshirt/verde/3.png' },
            { id: 'img16', url: '/dinoshirt/verde/4.png' },
        ],
        variants: {
            sizes: ['P', 'M', 'G', 'GG', 'XG'],
                colors: [
                { name: 'Branca', value: 'branca', hex: '#EFEFEF' },
                { name: 'Preta', value: 'preta', hex: '#161616' },
                { name: 'Azul Escura', value: 'azul-escura', hex: '#1D2A45' },
                { name: 'Verde', value: 'verde', hex: '#34824C' },
            ],
        },
    }
]

export default products;