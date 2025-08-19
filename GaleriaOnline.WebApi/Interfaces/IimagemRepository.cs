using GaleriaOnline.WebApi.Models;

namespace GaleriaOnline.WebApi.Interfaces
{
    public interface IimagemRepository
    {
        Task<IEnumerable<Imagem>> GetAllAsync();
        Task<Imagem?> GetByIdAsync(int id);

        Task<Imagem> CreateAsync(Imagem imagem);

        Task<bool> UpdateAsync(int id, Imagem imagem);

        Task<bool> DeleteAsync(int id);





    }
}
