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
        // https://docs-demo.solana-mainnet.quiknode.pro/
        // https://api.devnet.solana.com
        // https://api.mainnet-beta.solana.com
        $.ajax({
            type: "POST",
            url: "https://docs-demo.solana-mainnet.quiknode.pro/",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(jsonData),
            success: function (data, status) {
                console.log(status);
                console.log(data);
                if (data.error !== null) {
                    return;
                } else {
                    sol = data.result.value;

                    result(data.result.value);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });

        function result(r) {
            sol = r / 1000000000;
            inputValues.push({ wallet: inputValue });
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


    async function updateTable() {
        async function transformAddress(wallet) {
            const sol = await getSolBalance(wallet);
            return { wallet: wallet, sol: sol };
        }
        if (inputValues && inputValues.length > 0) {

            const currLength = $('#wallet-table').find('tr').length;
            const balances = await Promise.all(inputValues.map(address => transformAddress(address.wallet)));
            console.log(balances);
            balances.forEach((balance, idx) => {
                const sol = balance.sol;
                const row = $('<tr><td>' + (currLength + idx) + '</td><td>' + balance.wallet + '</td><td>' + balance.sol + '</td></tr>');
                $('#wallet-table').append(row);
            });


        }
    }

    function getSolBalance(wallet) {
        const jsonData = {
            jsonrpc: "2.0",
            id: 1,
            method: "getBalance",
            params: [wallet],
        };

        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "https://docs-demo.solana-mainnet.quiknode.pro/",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(jsonData),
                success: function (data, status) {
                    resolve(data.result.value / 1000000000);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    reject(errorThrown);
                }
            });
        });
    }
    updateTable();
});
