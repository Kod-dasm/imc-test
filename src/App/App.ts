import { ref } from 'vue'

type Types = 'container' | 'input' | 'datepicker' | 'list'
type Value = string | number

interface ListData {
	key: number
	value: string
}

interface JsonObject {
	type: Types
	code: string
	parent: string
	listdata?: ListData[]
	value?: Value
}

export default {
	components: {
	},
	setup() {
		const jsonString = ref('')

		const isAnJsonObject = (obj: any): obj is JsonObject => 'type' in obj && 'code' in obj && 'parent' in obj
			&& (Object.keys(obj).length > 3 ? 'listdata' in obj && 'value' in obj || 'value' in obj && Object.keys(obj).length < 5 : true)

		const getJsonObject = (json: string): JsonObject[] | void => {
			const jsonObjects: JsonObject[] = JSON.parse(json)

			for (let i = 0; i < jsonObjects.length; i++) {
				if(!isAnJsonObject(jsonObjects[i])) {
					return
				}
			}

			return jsonObjects
		}

		const generateForm = (json: string) => {
			const jsonObjects = getJsonObject(json)
			if(!jsonObjects) {
				return alert('Данный JSON не соответствует шаблону для генерации формы')
			}
			return alert('Формирование формы')
		}

		return {
			jsonString,
			generateForm
		}
	}
}
