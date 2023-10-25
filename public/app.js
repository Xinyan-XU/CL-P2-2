console.log("This is the page about the lists of movies and shows that were watched recently.");

window.addEventListener('load', () => {
    document.getElementById('button_rating').addEventListener('click', () => {

        let name = document.getElementById('flick_name');
        name.value = name.value.toUpperCase();
        let num = document.getElementById('flick_rating').value;
        
        // console.log(name);
        // console.log(num);

        //avoid empty string
        if (name.value.trim() !== '' && num !== '/') {
            let obj = {
                "name": name.value,
                "rate": num
            };
            let jsonData = JSON.stringify(obj);

            fetch('/flicks', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: jsonData
            })

                .then(response => response.json())
                .then(data => { console.log(data) })
        }

        //set name & rating value to default
        name.value = '';
        document.getElementById('flick_rating').value = "/";
    })

    document.getElementById('flick_rec').addEventListener('click', () => {
        fetch('/data')
            .then(response => response.json())
            .then(data => {
                document.getElementById('flick_info').innerHTML = '';
                console.log(data.data);

                // Reverse the array to display data from the last to the first
                data.data.reverse();

                for (let i = 0; i < data.data.length; i++) {
                    let string = "[" + data.data[i].date + "]\n" + " : " + data.data[i].name + " : " + data.data[i].rate + "/5";
                    let element = document.createElement('p');
                    element.innerHTML = string;
                    document.getElementById('flick_info').appendChild(element);
                }
            })
    })


})