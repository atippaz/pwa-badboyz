<template>
    <!-- <div class="loader-block" v-if="loadingState">
        <div class="loader">loaging<span></span></div>
    </div> -->

    <v-dialog transition="dialog-top-transition" v-model="loadingState">
        <div v-if="loadingState">
            <div class="loader">
                <span></span>
            </div>
            <div class="d-flex justify-center loading-text">loading</div>
        </div>
    </v-dialog>
</template>
<script setup lang="ts">
import { inject } from 'vue'
import { loaderPluginSymbol } from '@/plugins/loading'
const loader = inject(loaderPluginSymbol)!
const loadingState = loader.loadingState
</script>
<style scoped>
.loading-text {
    font-size: 20px;
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-top: 100px;
    color: #330085;
}

.loader-block {
    background-color: rgba(51, 51, 51, 0.1);
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
}

.loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    /* background: rgba(115, 115, 115, 0.1); */
    /* border: 3px solid #3c3c3c; */
    /* border-radius: 50%; */
    /* text-align: center; */
    line-height: 150px;
    font-family: sans-serif;
    font-size: 20px;

    /* text-shadow: 0 0 10px #330085; */
    /* box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); */
}

.loader:before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-top: 3px solid #330085;
    border-right: 3px solid #330085;
    border-radius: 50%;
    animation: animateC 2s linear infinite;
}

span {
    display: block;
    position: absolute;
    top: calc(50% - 2px);
    left: 50%;
    width: 50%;
    height: 4px;
    background: transparent;
    transform-origin: left;
    animation: animate 2s linear infinite;
}

span:before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #330085;
    top: -6px;
    right: -8px;
    box-shadow: 0 0 20px #330085;
}

@keyframes animateC {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes animate {
    0% {
        transform: rotate(45deg);
    }

    100% {
        transform: rotate(405deg);
    }
}</style>