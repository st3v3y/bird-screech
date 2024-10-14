<script setup lang="ts">
import { useOptionsStore } from '@/stores/options';
import { computed } from 'vue';

const store = useOptionsStore();

let playAudio = computed(() => {
  return store.playNotificationAudio;
});
</script>

<template>
  <!-- prettier-ignore -->
  <svg width="100%" height="100%" viewBox="0 0 913 647" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
        <g transform="matrix(1,0,0,1,-1388,0)">
            <g id="Artboard1" transform="matrix(0.724739,0,0,0.574806,1290.58,144.444)">
                <rect x="134.888" y="-251.291" width="1258.41" height="1124.87" style="fill:rgb(214,244,255);"/>
                <clipPath id="_clip1">
                    <rect x="134.888" y="-251.291" width="1258.41" height="1124.87"/>
                </clipPath>
                <g clip-path="url(#_clip1)">
                    <g transform="matrix(1.80407,0,0,2.27464,-47.6757,-450.366)">
                        <circle cx="504.231" cy="193.918" r="225.431" style="fill:url(#_Radial2);"/>
                    </g>
                    <g transform="matrix(1.37981,0,0,1.73972,101.772,-251.291)">
                        <rect x="-8.595" y="381.66" width="448.966" height="25.21" style="fill:rgb(155,81,59);"/>
                    </g>
                    <g transform="matrix(1.37981,0,0,1.73972,101.772,-94.0236)">
                        <rect x="-8.595" y="381.66" width="448.966" height="25.21" style="fill:rgb(155,81,59);"/>
                    </g>
                    <g transform="matrix(1.37981,0,0,1.73972,101.772,59.9385)">
                        <rect x="-8.595" y="381.66" width="448.966" height="25.21" style="fill:rgb(155,81,59);"/>
                    </g>
                    <g transform="matrix(1.37981,0,0,1.88109,101.772,-286.998)">
                        <path d="M110.497,312.481L110.497,591.048L16.581,591.048L16.581,312.481L62.444,252.568L110.497,312.481Z" style="fill:rgb(193,100,73);"/>
                    </g>
                    <g transform="matrix(1.37981,0,0,1.88109,270.221,-286.998)">
                        <path d="M110.497,312.481L110.497,591.048L16.581,591.048L16.581,312.481L62.444,252.568L110.497,312.481Z" style="fill:rgb(193,100,73);"/>
                    </g>
                    <g transform="matrix(1.37981,0,0,1.88109,447.229,-286.998)">
                        <path d="M110.497,312.481L110.497,591.048L16.581,591.048L16.581,312.481L62.444,252.568L110.497,312.481Z" style="fill:rgb(193,100,73);"/>
                    </g>
                    <g transform="matrix(1.37981,0,0,1.88109,626.112,-286.998)">
                        <path d="M110.497,312.481L110.497,591.048L16.581,591.048L16.581,312.481L62.444,252.568L110.497,312.481Z" style="fill:rgb(193,100,73);"/>
                    </g>
                    <g transform="matrix(3.06933e-17,-0.632009,2.32393,1.79417e-16,-634.004,895.192)">
                        <rect x="-72.158" y="324.746" width="997.381" height="550.805" style="fill:url(#_Linear3);"/>
                    </g>
                    <g transform="matrix(1.39551,0,0,1.39714,-1820.89,-90.9902)">
                        <path d="M2057.25,196.892C2189,196.892 2295.97,276.164 2295.97,373.805C2295.97,471.447 2189,550.719 2057.25,550.719C1925.49,550.719 1818.52,471.447 1818.52,373.805C1818.52,345.449 1827.54,318.643 1843.57,294.877C1850.41,284.737 1786.71,157.171 1786.71,157.171C1786.71,157.171 1886.51,249.74 1897.29,242.519C1939.64,214.166 1995.74,196.892 2057.25,196.892Z" style="fill:rgb(209,48,48);"/>
                    </g>
                    <g v-if="playAudio">
                        <g transform="matrix(1,0,0,1,-17.771,57.8098)">
                            <g transform="matrix(0.96398,-0.496646,0.381515,1.17721,-1065.14,753.218)">
                                <ellipse cx="1846.24" cy="170.492" rx="32.523" ry="23.993" style="fill:rgb(209,48,48);"/>
                            </g>
                            <g transform="matrix(1.37981,0,0,1.73972,-1780.75,-251.291)">
                                <path d="M1876.16,160.771L1876.16,71.299C1881.66,82.529 1881.96,90.244 1929.59,95.805C1911.64,97.171 1893.64,95.175 1876.16,84.92" style="fill:none;stroke:rgb(209,48,48);stroke-width:6.25px;"/>
                            </g>
                        </g>
                        <g transform="matrix(0.647653,0,0,0.616113,380.441,-11.7914)">
                            <g transform="matrix(0.96398,-0.496646,0.381515,1.17721,-1062.56,751.656)">
                                <ellipse cx="1846.24" cy="170.492" rx="32.523" ry="23.993" style="fill:rgb(209,48,48);"/>
                            </g>
                            <g transform="matrix(1.37981,0,0,1.73972,-1780.75,-251.291)">
                                <path d="M1876.16,160.771L1876.16,71.299C1881.66,82.529 1881.96,90.244 1929.59,95.805C1911.64,97.171 1893.64,95.175 1876.16,84.92" style="fill:none;stroke:rgb(209,48,48);stroke-width:9.89px;"/>
                            </g>
                        </g>
                        <g transform="matrix(0.301491,0,0,0.317799,493.446,-62.2519)">
                            <g transform="matrix(0.96398,-0.496646,0.381515,1.17721,-1056.29,747.491)">
                                <ellipse cx="1846.24" cy="170.492" rx="32.523" ry="23.993" style="fill:rgb(209,48,48);"/>
                            </g>
                            <g transform="matrix(1.37981,0,0,1.73972,-1776.2,-252.43)">
                                <path d="M1876.16,160.771L1876.16,71.299C1881.66,82.529 1881.96,90.244 1929.59,95.805C1911.64,97.171 1893.64,95.175 1876.16,84.92" style="fill:none;stroke:rgb(209,48,48);stroke-width:11.43px;"/>
                            </g>
                        </g>
                        <g transform="matrix(0.431627,0,0,0.439744,501.491,-108.717)">
                            <g transform="matrix(0.96398,-0.496646,0.381515,1.17721,-1056.29,747.491)">
                                <ellipse cx="1846.24" cy="170.492" rx="32.523" ry="23.993" style="fill:rgb(209,48,48);"/>
                            </g>
                            <g transform="matrix(1.37981,0,0,1.73972,-1773.29,-256.78)">
                                <path d="M1876.16,160.771L1876.16,71.299C1881.66,82.529 1881.96,90.244 1929.59,95.805C1911.64,97.171 1893.64,95.175 1876.16,84.92" style="fill:none;stroke:rgb(209,48,48);stroke-width:8.13px;"/>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </g>
        <defs>
            <radialGradient id="_Radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(225.431,0,0,225.431,504.231,193.918)"><stop offset="0" style="stop-color:rgb(240,204,9);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(241,209,31);stop-opacity:0"/></radialGradient>
            <linearGradient id="_Linear3" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(498.691,0,0,275.403,426.532,600.149)"><stop offset="0" style="stop-color:white;stop-opacity:1"/><stop offset="1" style="stop-color:white;stop-opacity:0"/></linearGradient>
        </defs>
    </svg>
</template>
