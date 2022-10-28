using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IPhotoRepository
    {
        Task<PagedList<PhotoForApprovalDto>> GetUnapprovedPhotos(PaginationParams pagParams);
        Task<Photo> GetPhotoById(int id);
        void RemovePhoto(Photo photo);
        Task<IEnumerable<Photo>> GetUserPhotosByUserId(int userId);
    }
}