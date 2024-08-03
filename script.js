$(document).ready(function () {
    let inputValues = localStorage.getItem("wallet_addresses");
    if (inputValues === null) {
        inputValues = [];
    } else {
        inputValues = JSON.parse(localStorage.getItem("wallet_addresses"));
    }


    $('#myForm').submit(function (event) {
        event.preventDefault(); // Prevent default form submission
        const inputValue = $('#myForm input[type="text"]').val();
        const jsonData = {
            jsonrpc: "2.0",
            id: 1,
            method: "getBalance",
            params: [inputValue],
        };
        console.log(JSON.stringify(jsonData));
        var sol;

        $.ajax({
            type: "POST",
            url: "https://api.devnet.solana.com",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(jsonData),
            success: function (data, status) {
                // alert("Data: " + data + "\nStatus: " + status);
                console.log(status);
                console.log(data);
                sol = data.result.value;
                result(data.result.value);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });

        function result(r) {
            sol = r / 1000000000;
            inputValues.push({wallet: inputValue, sol: sol});
            inputValues.forEach(e => {
                console.log(e);
            });
            localStorage.setItem('wallet_addresses', JSON.stringify(inputValues));
            console.log("Submitted");
            $('#myForm input[type="text"]').val('');
            addRow(inputValue, sol);
        }


    });
    function addRow(address, sol) {
        const idx = $('#wallet-table').find('tr').length;
        const row = $('<tr><td>' + idx + '</td><td>' + address + '</td><td>' + sol + '</td></tr>');
        $('#wallet-table').append(row);
    }
    function updateTable() {
        if (inputValues && inputValues.length > 0) {

            const currLength = $('#wallet-table').find('tr').length;
            inputValues.forEach((address, idx) => {
                let wallet = address.wallet;
                let sol = address.sol;
                const row = $('<tr><td>' + (currLength + idx) + '</td><td>' + wallet + '</td><td>'+sol+ '</td></tr>');
                $('#wallet-table').append(row);
            });

        }
    }
    updateTable();
});

    //  844SVH8KVDSbAgJXXMAZdbUKrYDowfSyE6E66LRENTmU
    //  HYAp4BRD9hxcALfX7XS3rAKDDCcDJiAyTtGWkbaZRGKL