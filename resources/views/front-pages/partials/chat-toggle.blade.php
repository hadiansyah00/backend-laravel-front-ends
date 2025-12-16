<style>
    /* --- Custom scrollbar untuk chat window --- */
    .chat-scroll {
        scrollbar-width: thin;
        scrollbar-color: #f97316 #f9f9f9;
    }

    .chat-scroll::-webkit-scrollbar {
        width: 8px;
    }

    .chat-scroll::-webkit-scrollbar-track {
        background: #f9f9f9;
        border-radius: 10px;
    }

    .chat-scroll::-webkit-scrollbar-thumb {
        background-color: #f97316;
        border-radius: 10px;
    }

    .chat-scroll::-webkit-scrollbar-thumb:hover {
        background-color: #ea580c;
    }
</style>

<div x-data="chatBotApp()" x-init="window.addEventListener('scroll', () => showButton = (window.scrollY > 300))"
    @keydown.escape.window="chatOpen = false" class="fixed z-50 bottom-24 right-8">

    <template x-if="showButton">
        <div>
            <!-- Chatbox -->
            <div x-show="chatOpen" x-transition @click.outside="chatOpen = false"
                class="absolute right-0 flex flex-col overflow-hidden bg-white border border-gray-200 shadow-2xl bottom-20 w-80 rounded-2xl h-[500px] max-h-[70vh]">

                <!-- Header -->
                <div class="flex items-center justify-between p-4 text-white bg-orange-600">
                    <div class="flex items-center gap-3">
                        <img class="w-10 h-10 border-2 border-white rounded-full"
                            src="{{ asset('assets/img/icon/logo_sbh.png') }}" alt="Avatar">
                        <div>
                            <p class="text-sm leading-tight text-gray-200">Asisten Virtual</p>
                            <h2 class="text-lg font-semibold">Halo STIKes</h2>
                        </div>
                    </div>
                    <button @click="chatOpen = false"
                        class="text-2xl leading-none text-white hover:opacity-80">&times;</button>
                </div>

                <!-- Chat Body -->
                <div class="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50 chat-scroll" x-ref="messages">
                    <template x-for="(msg, index) in messages" :key="index">
                        <div :class="msg.from === 'bot' ? 'text-left' : 'text-right'">
                            <div :class="msg.from === 'bot'
                                ? 'bg-orange-100 text-gray-800 rounded-xl p-3 inline-block max-w-[80%]'
                                : 'bg-orange-600 text-white rounded-xl p-3 inline-block max-w-[80%]'">
                                <span x-html="msg.text"></span>
                            </div>
                        </div>
                    </template>
                </div>

                <!-- Chat Input -->
                <div class="p-3 bg-white border-t">
                    <form @submit.prevent="sendMessage">
                        <textarea x-model="userInput" placeholder="Ketik pertanyaanmu di sini..." rows="2"
                            @keydown.enter.prevent="sendMessage"
                            class="w-full p-2 text-sm border rounded-md resize-none focus:ring-orange-500 focus:border-orange-500"></textarea>
                        <button type="submit"
                            class="w-full py-2 mt-2 font-semibold text-white transition bg-orange-600 rounded-md hover:bg-orange-700">
                            KIRIM
                        </button>
                    </form>
                </div>
            </div>

            <!-- Floating Chat Button -->
            <button @click="chatOpen = !chatOpen"
                class="flex items-center justify-center w-16 h-16 text-white transition duration-300 transform bg-orange-600 rounded-full shadow-lg hover:bg-orange-700 hover:scale-110">
                <svg x-show="!chatOpen" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <svg x-show="chatOpen" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </template>
</div>
<script>
    function chatBotApp() {
    return {
        /* =====================
         * STATE
         * ===================== */
        showButton: false,
        chatOpen: false,
        userInput: '',
        sessionId: localStorage.getItem("chat_session_id") || (() => {
            const id = "sess_" + Date.now() + "_" + Math.random().toString(36).substr(2, 8);
            localStorage.setItem("chat_session_id", id);
            return id;
        })(),

        messages: [
            {
                from: 'bot',
                text: 'Halo! 👋 Saya asisten virtual <b>STIKes Bogor Husada</b>. Ada yang bisa saya bantu?'
            }
        ],

        /* =====================
         * LIFECYCLE
         * ===================== */
        init() {
            this.handleScroll = () => {
                this.showButton = window.scrollY > 300;
            };

            window.addEventListener('scroll', this.handleScroll);
        },

        /* =====================
         * METHODS
         * ===================== */
        async sendMessage() {
            const userText = this.userInput.trim();
            if (!userText) return;

            // user message
            this.messages.push({ from: 'user', text: userText });
            this.userInput = '';
            this.scrollToBottom();

            // bot loading
            const loadingIndex = this.messages.push({
                from: 'bot',
                text: '<i>Sedang mengetik...</i>'
            }) - 1;

            try {
                const response = await fetch("https://chatbot.sbh.ac.id/api/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        message: userText,
                        session_id: this.sessionId
                    })
                });

                if (!response.ok) {
                    this.messages[loadingIndex].text =
                        `<i>Server error: ${response.status}</i>`;
                    return;
                }

                const data = await response.json();

                this.messages[loadingIndex].text =
                    data.reply || "<i>Bot tidak mengirim balasan.</i>";

            } catch (error) {
                console.error(error);
                this.messages[loadingIndex].text =
                    "<i>Gagal terhubung ke server chatbot.</i>";
            }

            this.scrollToBottom();
        },

        /* =====================
         * HELPERS
         * ===================== */
        scrollToBottom() {
            this.$nextTick(() => {
                this.$refs.messages?.scrollTo({
                    top: this.$refs.messages.scrollHeight,
                    behavior: 'smooth'
                });
            });
        }
    }
}
</script>