import {Command} from "commander"

const program = new Command()

program     //'argmuent','description','default value'
    .option('--mode <mode>','Especificacion de entorno', 'Development')
    .parse()


export default program