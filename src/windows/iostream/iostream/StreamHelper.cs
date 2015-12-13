using System;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Storage.Streams;

namespace tranduytrung.iostream
{
    public sealed class StreamHelper
    {
        private const int BufferSize = 16384;
        public static IAsyncAction Copy(IInputStream source, IOutputStream target)
        {
            return AsyncInfo.Run(async token =>
            {
                var bytes = new byte[BufferSize];
                var buffer = bytes.AsBuffer();
                uint readBytes;
                do
                {
                    token.ThrowIfCancellationRequested();
                    await source.ReadAsync(buffer, BufferSize, InputStreamOptions.Partial);
                    readBytes = buffer.Length;
                    await target.WriteAsync(buffer);
                } while (readBytes > 0);
            });
        }
    }
}
