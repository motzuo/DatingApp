using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhotoRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<Photo> GetPhotoById(int id)
        {
            return await _context.Photos.IgnoreQueryFilters().FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<PagedList<PhotoForApprovalDto>> GetUnapprovedPhotos(PaginationParams pagParams)
        {
            var query = _context.Photos.Where(x => !x.IsApproved).IgnoreQueryFilters().ProjectTo<PhotoForApprovalDto>(_mapper.ConfigurationProvider).AsNoTracking();
            return await PagedList<PhotoForApprovalDto>.CreateAsync(query, pagParams.PageNumber, pagParams.PageSize);
        }

        public void RemovePhoto(Photo photo)
        {
            _context.Photos.Remove(photo);
        }

        public async Task<IEnumerable<Photo>> GetUserPhotosByUserId(int userId)
        {
            return await _context.Photos.Where(x => x.AppUserId == userId).ToListAsync();
        }
    }
}