using System;
using System.Collections.Generic;
using System.Text;

namespace MindMap.Models
{
    public class NodeModel
    {
        public Guid Id { get; set; }
        public Guid? ParentId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Note { get; set; }

        public List<NodeModel> Children { get; set; }
        public NodeModel()
        {
            Id = Guid.NewGuid();
            Children = new List<NodeModel>();
        }
    }
}
