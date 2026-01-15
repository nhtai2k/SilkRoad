using ChatBot.IHelpers;
using Common;
using OpenAI.Audio;
using System.Text.Json;

namespace ChatBot.Helpers
{
    public class VoiceHelper : IVoiceHelper
    {
        public async Task<byte[]> GetVoiceFromChatGPTAsync(string text)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(text))
                {
                    throw new ArgumentException("Text cannot be null or empty.", nameof(text));
                }
                // Create audio client using the same API key as chat
                AudioClient client = new("tts-1", Constants.ChatGPTKey);
                // string instructions = 
                //                     @"Tone: Cheerful, playful, and friendly, with a touch of cuteness and innocence.
                //                     Emotion: Warmth and positivity, sprinkled with curiosity and lighthearted energy.
                //                     Delivery: Bright and lively, slightly faster than normal, with gentle giggles, soft exclamations (""yaa~"", ""hihi"", ""aww""), and occasional drawn-out words to emphasize excitement (""sooo fun!"", ""cuuuteee~"").";
                // Generate speech from text
                var response = await client.GenerateSpeechAsync(text, GeneratedSpeechVoice.Nova);

                // Get the audio data as bytes
                var audioBytes = response.Value.ToArray();

                return audioBytes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error generating speech: {ex.Message}", ex);
            }
        }
        public async Task<byte[]> GetVoiceFromElevenlabsAsync(string text)
        {
            try
            {
                // Create speech (POST /v1/text-to-speech/:voice_id) using HttpClient in C#
                using var httpClient = new HttpClient();
                var requestUrl = "https://api.elevenlabs.io/v1/text-to-speech/R5gMQAqFtnaPweI0PDWi?output_format=mp3_44100_128";
                httpClient.DefaultRequestHeaders.Add("xi-api-key", Constants.TextToSpeechKey);
                httpClient.DefaultRequestHeaders.Add("Accept", "application/json");

                var payload = new
                {
                    text,
                    voice_settings = new
                    {
                        stability = 0.8,
                        speed = 1,
                        similarity_boost = 0.4
                    },
                    model_id = "eleven_turbo_v2_5",
                    language_code = "vi"
                };

                var content = new StringContent(JsonSerializer.Serialize(payload), System.Text.Encoding.UTF8, "application/json");
                var response = await httpClient.PostAsync(requestUrl, content);

                if (!response.IsSuccessStatusCode)
                {
                    throw new Exception($"Failed to generate speech: {response.StatusCode} - {await response.Content.ReadAsStringAsync()}");
                }

                var responseBytes = await response.Content.ReadAsByteArrayAsync();
                return responseBytes;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error generating speech: {ex.Message}", ex);
            }
        }
    }
}
