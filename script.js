$(document).ready(function () {
    let inputValues = localStorage.getItem("wallet_addresses");
    if (inputValues === null) {
        inputValues = [];
    } else {
        inputValues = JSON.parse(localStorage.getItem("wallet_addresses"));
    }

    $('body').on('focus', '[contenteditable]', function () {
        const $this = $(this);
        $this.data('before', $this.html());
    }).on('blur keyup paste input', '[contenteditable]', function () {
        const $this = $(this);

        if ($this.data('before') !== $this.html()) {
            $this.data('before', $this.html());
            $this.trigger('change');
            localStorage.setItem($this.attr("id"), $this.html());
        }
    });

    $('#myForm').submit(function (event) {
        event.preventDefault(); // Prevent default form submission
        const inputValue = $('#myForm input[type="text"]').val();
        $('#wallet-error').text();
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
                console.log(data.error);
                if (data.error === undefined) {
                    sol = data.result.value;

                    result(sol);

                } else {
                    $('#myForm input[type="text"]').val('');
                    $('#wallet-error').text("Please enter a valid wallet address");
                    return;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });

        function result(r) {
            sol = r / 1000000000;
            if (inputValues.some(item => item.wallet === inputValue)) {
                $('#wallet-error').text("Wallet already added");
                return;
            }
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
        const nickname = '';
        const row = $('<tr><td>' + idx + '</td><td contenteditable=true class="nickname"  id="' + address + '"></td><td>' + sol + '</td><td>' + address + '</td></tr>');
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
            const orderedBalances = balances.sort((a, b) => b.sol - a.sol);
            orderedBalances.forEach((balance, idx) => {
                const sol = balance.sol;
                const nickname = localStorage.getItem(balance.wallet) === null ? '' : localStorage.getItem(balance.wallet);
                console.log(nickname);
                if (idx === 0) {
                    const row = $('<tr><td><img id="trophy-icon" src="trophy.png"/></td><td contenteditable=true class="nickname" id="' + balance.wallet + '">' + nickname + '</td><td>' + sol + '</td><td>' + balance.wallet + '</td></tr>'); 
                    $('#wallet-table').append(row);
                } else { 
                    const row = $('<tr><td>' + (currLength + idx) + '</td><td contenteditable=true class="nickname" id="' + balance.wallet + '">' + nickname + '</td><td>' + sol + '</td><td>' + balance.wallet + '</td></tr>'); 
                    $('#wallet-table').append(row);
                }

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

    function countdownToEndOfAugust() {
        const endDate = new Date(2024, 7, 31, 23, 59, 59); // August 31st, 23:59:59, 2024
        const now = new Date();

        const timeRemaining = endDate - now;

        // Convert milliseconds to days, hours, minutes, and seconds
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Display the countdown
        console.log(`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
        return { days: days, hours: hours, minutes: minutes, seconds: seconds };
    }
    function updateTimer() {
        // Logic to calculate new content
        const time = countdownToEndOfAugust();
        const timeStr = `${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds`;
        // Get the div element
        const divElement = document.getElementById('countdown');

        // Update the div content
        divElement.textContent = timeStr;
    }
    updateTimer();
    setInterval(updateTimer, 1000);

    updateTable();
});
