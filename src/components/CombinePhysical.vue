<template>
    <div id="combinePhysical">
        <span v-if="define && index === 0">
            {{ physical }}
        </span>
        <span v-else-if="define">
            _{{ physical }}
        </span>
        <span v-else-if="index === 0" class="physical-false">
            {{ physical }}
        </span>
        <span v-else class="physical-false">
            _{{ physical }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'combinePhysical',
    props: {
        physical: {
            type: String
        },
        define: {
            type: Boolean
        },
        index: {
            type: Number
        }
    }
}
</script>
