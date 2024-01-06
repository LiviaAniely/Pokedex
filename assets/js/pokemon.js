class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;

    constructor(number,name,types,photo){
        this.number = number;
        this.name = name;
        this.types = types.map((typeSlot) => typeSlot.type.name);
        this.type = this.types[0];
        this.photo = photo;
    }
}