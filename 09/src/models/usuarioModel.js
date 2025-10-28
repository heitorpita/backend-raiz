
import { usuarios } from "../data/banco.js";

export default class UsuarioModel {

    static listar(){
        return usuarios;
    }

    static buscarPorId(id){
        return usuarios.find(u => u.id === parseInt(id));
    }

    static criar(usuario){
        usuarios.push(usuario)
        return usuario;
    }

    static atualizar( id, novosDados ){
        const index = usuarios.findIndex(u => u.id === parseInt(id))
        if(index === -1){
            return null;
        }
        usuarios[index] = {...usuarios[index], ...novosDados}; 
        return usuarios[index]
    }

    static deletar(id){
        const index = usuarios.findIndex(u => u.id === parseInt(id));
        if(index === -1){
            return false;
        }
        usuarios.splice(index, 1);

        return true;
    }

}