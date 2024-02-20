import gradio as gr
import requests

def ask_question(file, question):
    headers = {'x-api-key': 'sec_2tJb4DsSggV1EDHGUWALujqp5zADxBUY'}
    files = [('file', ('file', open(file.name, 'rb'), 'application/octet-stream'))]

    response = requests.post('https://api.chatpdf.com/v1/sources/add-file', headers=headers, files=files)

    if response.status_code == 200:
        sourceId = response.json()['sourceId']
        data = {
            'sourceId': sourceId,
            'messages': [
                {
                    'role': "user",
                    'content': question,
                }
            ]
        }
        response = requests.post('https://api.chatpdf.com/v1/chats/message', headers=headers, json=data)

        if response.status_code == 200:
            return response.json()['content']
        else:
            return f"Error: {response.text}"
    else:
        return f"Error: {response.text}"

iface = gr.Interface(fn=ask_question, inputs=["file", "text"], outputs="text")
# iface.launch()
# iface.launch(share=True)
iface.launch(server_name="0.0.0.0")

