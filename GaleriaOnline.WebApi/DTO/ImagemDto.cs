using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace GaleriaOnline.WebApi.DTO
{
    public class ImagemDto
    {
        public IFormFile Arquivo { get; set; }

        public string? Nome { get; set; }

    }
}
