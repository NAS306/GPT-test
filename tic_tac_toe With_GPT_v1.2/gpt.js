const API_KEY = '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';

// API 호출이 진행되고 있는지의 여부
let apiCallInProgress = false;

// 대화 내역
let chatHistory = [
    { role: 'system', content: 'You are playing Tic Tac Toe. Please make your moves by ONLY saying the location in the format like `[c2]` where row is a, b, c and col is 1, 2, 3. Avoid choosing locations that are already claimed. Make it short.' },
];

function Send() {
    // API 재 호출 방지
    if (apiCallInProgress) {
        return;
    }

    // API 호출이 진행되는 중
    apiCallInProgress = true;

    // 프롬프트에 게임프롬프트를 전달
    const userMessage = { role: 'user', content: gamePrompt };
    chatHistory.push(userMessage);
    console.log(gamePrompt);

    const api_key = API_KEY;

    const data = {
        model: 'gpt-3.5-turbo',
        temperature: 0.05,
        messages: chatHistory,
    };

    $.ajax({
        url: "https://api.openai.com/v1/chat/completions",
        method: 'POST',
        headers: {
            Authorization: "Bearer " + api_key,
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
    }).then(function (response) {
        var messageContent = response.choices[0].message.content;
        console.log(messageContent);
        clickCellByLocation(messageContent);

        // API 호출이 끝남
        apiCallInProgress = false;
    });
}
