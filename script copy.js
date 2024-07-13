(function () {

    async function getAllToDos() {
        try {
            const request = await fetch('https://jsonplaceholder.typicode.com/todos')
            if (!request.ok) {
                throw new Error("fifibfb")
            }
            const data = await request.json();
            return data;
        } catch (error) {
            console.error('Erro no fetch: ', error);
        }

    }



    async function getAllToDosOfUser(userId) {
        try {
            const request = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
            if (!request.ok) {
                throw new Error("fifibfb")
            }
            const data = await request.json();
            return data;
        } catch (error) {
            console.error('Erro no fetch: ', error);
        }
    }

    // const user1 = getAllToDosOfUser(2);
    // user1.then(user1 =>{
    //     for(todos of user1){
    //         console.log(todos);
    //     }
    // }).catch((erro)=>{
    //     console.log(erro);
    // })

    async function addNewToDo(title,) {
        try {
            const request = await fetch("https://jsonplaceholder.typicode.com/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: 1,
                    id: 201,
                    title: title,
                    completed: true
                })
            });

            if (!request.ok) {
                throw new Error("Internet de bosta");
            }

            const data = await request.json();
            console.log(data);


        } catch (error) {
            console.log(error);
        }
    }

    // addNewToDo("SEXO");

    async function updateTodo(id) {

        try {
            const request = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: "cuzinho",
                    completed: "true"
                })
            });

            if(!request.ok){
                throw new Error("erro da net")
            }
            console.log(await request.json())
        } catch (e) {
            console.log(e);
        }

    }
    
    updateTodo(200)


})();

/**{
 "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false

}
 */