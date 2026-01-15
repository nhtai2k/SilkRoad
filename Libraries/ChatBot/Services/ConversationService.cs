using System;
using ChatBot;
using ChatBot.IServices;
using ChatBot.Models;
using Common.Models;
using MongoDB.Driver;

namespace ChatBot.Services;

public class ConversationService : IConversationService
{
    private readonly ApplicationConnection _applicationConnection;
    
    public ConversationService(ApplicationConnection applicationConnection)
    {
        _applicationConnection = applicationConnection ?? throw new ArgumentNullException(nameof(applicationConnection));
    }
    
    public async Task CreateAsync(ConversationModel entity)
    {
        if (entity == null)
            throw new ArgumentNullException(nameof(entity));
            
        await _applicationConnection._conversationsCollection.InsertOneAsync(entity);
    }

    public async Task<IEnumerable<ConversationModel>> GetAllAsync()
    {
        return await _applicationConnection._conversationsCollection.Find(_ => true).ToListAsync();
    }


    public async Task<Pagination<ConversationModel>> GetAllAsync(ConversationFilterModel filter)
    {
        var filters = Builders<ConversationModel>.Filter.Empty;

        if (filter != null)
        {
            if (!string.IsNullOrWhiteSpace(filter.SearchText))
            {
                filters &= Builders<ConversationModel>.Filter.Text(filter.SearchText);
            }

            if (filter.StartDate.HasValue)
            {
                filters &= Builders<ConversationModel>.Filter.Gte(x => x.Timestamp, filter.StartDate.Value);
            }

            if (filter.EndDate.HasValue)
            {
                filters &= Builders<ConversationModel>.Filter.Lte(x => x.Timestamp, filter.EndDate.Value);
            }
        }

        // Get all matching conversations
        var allConversations = await _applicationConnection._conversationsCollection.Find(filters).ToListAsync();
        
        // Calculate pagination
        var totalItems = allConversations.Count;
        var pageSize = filter?.PageSize ?? 10;
        var pageIndex = filter?.PageIndex ?? 1;
        var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);
        
        // Apply pagination
        var pagedConversations = allConversations
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        // Return Pagination object
        return new Pagination<ConversationModel>
        {
            Items = pagedConversations,
            PageIndex = pageIndex,
            PageSize = pageSize,
            CurrentPage = pageIndex,
            TotalItems = totalItems,
            TotalPages = totalPages
        };
    }

    public async Task<ConversationModel> GetByIdAsync(Guid Id)
    {
        if (Id == Guid.Empty)
            throw new ArgumentException("Id cannot be empty", nameof(Id));

        return await _applicationConnection._conversationsCollection.Find(x => x.Id == Id).FirstOrDefaultAsync();
    }
}
