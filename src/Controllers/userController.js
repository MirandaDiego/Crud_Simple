const { error } = require('console');
const connection = require('../db/index');

class UserController {
    async create(request, response) {
        const { cpf, name, phone, email } = request.body

        try {
            const db = await connection();

            const result = await db.query(
                'INSERT INTO users (cpf, name, phone, email) VALUES(?, ?, ?, ?)',
                [cpf, name, phone, email]
            );
            console.log('Registration completed successfully!', result);
            return response.status(201).json({ message: 'Registration entered successfully!' })
        } catch (error) {
            console.log('Error inserting record', error);
            return response.status(500).json({ error: 'Register failed!' })
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        try {
            const db = await connection();


            const result = await db.query('DELETE FROM users WHERE id = ?', [id]);


            if (result) {
                return response.status(200).json({ message: 'User deleted successfully' });
            } else {
                return response.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            return response.status(500).json({ error: 'Internal server error' });
        }
    }


    async update(request, response) {
        const { phone, email } = request.body;
        const { id } = request.params;
    
        try {
            const db = await connection();
    
            const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    
            if (!user) {
                console.error('Usuário não encontrado');
                return response.status(404).json({ error: 'Usuário não encontrado' });
            } else {
                const result = await db.query('UPDATE users SET phone = ?, email = ? WHERE id = ?', [phone, email, id]);
    
                return response.status(200).json({ message: 'Usuário atualizado!' });
            }
        } catch (error) {
            console.error('ERROR', error);
            return response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
    

    async show(request, response) {
        const { name } = request.params; 

        try {
            const db = await connection();


            const [rows] = await db.query('SELECT * FROM users WHERE name LIKE ?', [`%${name}%`]);

            if (rows.length > 0) {
                return response.status(200).json(rows);
            } else {
                return response.status(404).json({ message: 'Nenhum usuário encontrado com esse nome' });
            }
        } catch (error) {
            console.error('Erro ao filtrar usuários por nome:', error);
            return response.status(500).json({ error: 'Erro interno no servidor' });
        }

    }

    async showUsers( request, response ){

        try{
            const db = await connection();

            const result = await db.query('SELECT * FROM users');

            console.log('RESULT:', result[0])
            
            return response.status(200).json(result[0]);
             
        }catch(error){

            return response.status(500).json({error: "ERROR", error})
        }


    }






}

module.exports = UserController;



