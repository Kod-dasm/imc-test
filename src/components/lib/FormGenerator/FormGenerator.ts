// import { JsonObject } from "@/types/JsonObjects"

import { toRefs } from 'vue'

export default {
	props: {
		jsonObjects: [],
	},

	components: {
	},

	setup(props: any) {
		const { jsonObjects } = toRefs(props)
		console.log('jsonObjects', jsonObjects.value[1])

		return
	}
}
