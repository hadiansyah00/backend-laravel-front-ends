<style>
    /* Scrollbar Halus */
    .chat-scroll {
        scrollbar-width: thin;
        scrollbar-color: #f97316 #f3f4f6;
    }

    .chat-scroll::-webkit-scrollbar {
        width: 6px;
    }

    .chat-scroll::-webkit-scrollbar-track {
        background: #f3f4f6;
    }

    .chat-scroll::-webkit-scrollbar-thumb {
        background-color: #f97316;
        border-radius: 20px;
    }
</style>

<div x-data="{
        showButton: false,
        menuOpen: false,
        chatOpen: false,
        toggleMenu() {
            if(this.chatOpen) {
                this.chatOpen = false;
                this.menuOpen = false;
            } else {
                this.menuOpen = !this.menuOpen;
            }
        },
        openChat() {
            this.menuOpen = false;
            this.chatOpen = true;
        }
    }" x-init="window.addEventListener('scroll', () => showButton = (window.scrollY > 300))"
    @keydown.escape.window="menuOpen = false; chatOpen = false"
    class="fixed z-50 flex flex-col items-end gap-4 font-sans bottom-8 right-8">

    <div x-show="chatOpen" x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0 translate-y-10 scale-95"
        x-transition:enter-end="opacity-100 translate-y-0 scale-100"
        x-transition:leave="transition ease-in duration-200"
        x-transition:leave-start="opacity-100 translate-y-0 scale-100"
        x-transition:leave-end="opacity-0 translate-y-10 scale-95" @click.outside="chatOpen = false"
        class="w-[350px] max-w-[90vw] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[500px] max-h-[70vh]">

        <div class="flex items-center justify-between p-4 shadow-md bg-gradient-to-r from-orange-600 to-orange-500">
            <div class="flex items-center gap-3">
                <div class="relative">
                    <img class="w-10 h-10 rounded-full border-2 border-white/50 p-0.5 bg-white object-cover"
                        src="{{ asset('assets/img/icon/bot.svg') }}" alt="Bot Avatar">
                    <span
                        class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-orange-600 rounded-full"></span>
                </div>
                <div class="text-white">
                    <p class="text-xs opacity-90">STIKes Assistant</p>
                    <h2 class="text-base font-bold tracking-wide">Help Center</h2>
                </div>
            </div>
            <button @click="chatOpen = false"
                class="p-1 transition rounded-full text-white/80 hover:text-white hover:bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <div class="relative flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50 chat-scroll">
            <div class="absolute inset-0 pointer-events-none opacity-5"
                style="background-image: radial-gradient(#fb923c 1px, transparent 1px); background-size: 20px 20px;">
            </div>

            <div class="flex flex-col items-start gap-1 max-w-[85%] z-10 relative">
                <div
                    class="px-4 py-3 text-sm leading-relaxed text-gray-700 bg-white border border-gray-200 rounded-tl-none shadow-sm rounded-2xl">
                    Halo! 👋 Ada yang bisa saya bantu terkait informasi akademik atau pendaftaran?
                </div>
                <span class="text-[10px] text-gray-400 ml-1">Baru saja</span>
            </div>

            <div class="flex flex-col items-end gap-1 ml-auto max-w-[85%] z-10 relative">
                <div
                    class="px-4 py-3 text-sm leading-relaxed text-white bg-orange-600 rounded-tr-none shadow-md rounded-2xl">
                    Info pendaftaran mahasiswa baru dong kak.
                </div>
                <span class="text-[10px] text-gray-400 mr-1">Read</span>
            </div>
        </div>

        <div class="p-3 bg-white border-t border-gray-100">
            <form @submit.prevent="sendMessage" class="flex gap-2">
                <input type="text" placeholder="Tulis pesan..."
                    class="w-full bg-gray-100 text-gray-700 text-sm rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-white transition placeholder-gray-400">
                <button type="submit"
                    class="bg-orange-600 hover:bg-orange-700 text-white rounded-full p-2.5 shadow-lg shadow-orange-600/30 transition transform hover:scale-105 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </form>
        </div>
    </div>

    <div x-show="menuOpen && !chatOpen" class="flex flex-col items-end gap-3 mb-2">

        <button @click="openChat()" x-transition:enter="transition ease-out duration-300 delay-100"
            x-transition:enter-start="opacity-0 translate-y-4 scale-90"
            x-transition:enter-end="opacity-100 translate-y-0 scale-100"
            x-transition:leave="transition ease-in duration-200"
            x-transition:leave-start="opacity-100 translate-y-0 scale-100"
            x-transition:leave-end="opacity-0 translate-y-4 scale-90"
            class="flex items-center gap-3 py-2 pl-4 pr-2 transition-all bg-white border border-gray-100 rounded-full shadow-lg cursor-pointer group hover:shadow-xl hover:border-orange-100">
            <span class="text-sm font-medium text-gray-600 transition group-hover:text-orange-600">Live Chat</span>
            <div
                class="flex items-center justify-center w-10 h-10 transition duration-300 rounded-full bg-orange-50 group-hover:bg-orange-600">
                <img src="{{ asset('assets/img/icon/bot.svg') }}" class="object-contain w-6 h-6" alt="Bot">
            </div>
        </button>

        <a href="https://wa.me/6282321780950" target="_blank" x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0 translate-y-4 scale-90"
            x-transition:enter-end="opacity-100 translate-y-0 scale-100"
            x-transition:leave="transition ease-in duration-200 delay-75"
            x-transition:leave-start="opacity-100 translate-y-0 scale-100"
            x-transition:leave-end="opacity-0 translate-y-4 scale-90"
            class="flex items-center gap-3 py-2 pl-4 pr-2 transition-all bg-white border border-gray-100 rounded-full shadow-lg cursor-pointer group hover:shadow-xl hover:border-green-100">
            <span class="text-sm font-medium text-gray-600 transition group-hover:text-green-600">WhatsApp</span>
            <div
                class="flex items-center justify-center w-10 h-10 transition duration-300 rounded-full bg-green-50 group-hover:bg-green-500">
                <img src="{{ asset('assets/img/icon/whatsapp.svg') }}" class="object-contain w-6 h-6" alt="WA">
            </div>
        </a>
    </div>

    <template x-if="showButton">
        <button @click="toggleMenu()" x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0 scale-50 rotate-90"
            x-transition:enter-end="opacity-100 scale-100 rotate-0"
            class="relative flex items-center justify-center text-white transition-all duration-300 bg-orange-600 rounded-full shadow-xl group w-14 h-14 shadow-orange-600/40 hover:bg-orange-700 hover:scale-110 focus:outline-none ring-4 ring-white/30">

            <svg x-show="!menuOpen && !chatOpen" x-transition:enter="transition ease-out duration-300 absolute"
                x-transition:enter-start="opacity-0 rotate-[-90deg] scale-50"
                x-transition:enter-end="opacity-100 rotate-0 scale-100"
                x-transition:leave="transition ease-in duration-150 absolute"
                x-transition:leave-start="opacity-100 rotate-0 scale-100"
                x-transition:leave-end="opacity-0 rotate-90 scale-50" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>

            <svg x-show="menuOpen || chatOpen" x-transition:enter="transition ease-out duration-300 absolute"
                x-transition:enter-start="opacity-0 rotate-90 scale-50"
                x-transition:enter-end="opacity-100 rotate-0 scale-100"
                x-transition:leave="transition ease-in duration-150 absolute"
                x-transition:leave-start="opacity-100 rotate-0 scale-100"
                x-transition:leave-end="opacity-0 rotate-[-90deg] scale-50" xmlns="http://www.w3.org/2000/svg"
                class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
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
